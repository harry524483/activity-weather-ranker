import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as common from '~frontend/common';
import { useDebouncedGeocodingSearch } from './useDebouncedGeocodingSearch';

vi.mock('lodash.debounce', () => ({
  default: vi.fn((fn) => fn),
}));

const mockData = {
  data: {
    searchGeocoding: [
      { latitude: 1, longitude: 2, name: 'London', country: 'UK' },
      { latitude: 3, longitude: 4, name: 'Paris', country: 'France' },
    ],
  },
};

describe('useDebouncedGeocodingSearch', () => {
  let fetchGeocodingMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchGeocodingMock = vi.fn();

    vi.spyOn(common, 'useSearchGeocodingLazyQuery').mockReturnValue([
      fetchGeocodingMock,
      { loading: false } as any,
    ]);
  });

  it('should call callback with formatted locations after debounce', async () => {
    // Arrange
    fetchGeocodingMock.mockResolvedValueOnce(mockData);
    const { result } = renderHook(() => useDebouncedGeocodingSearch(1000));
    const callback = vi.fn();

    // Act
    await act(async () => {
      result.current.debouncedFetchLocations('test', callback);
    });

    // Assert
    expect(fetchGeocodingMock).toHaveBeenCalledWith({
      variables: { location: 'test' },
    });

    expect(callback).toHaveBeenCalledWith([
      { value: { latitude: 1, longitude: 2 }, label: 'London - UK' },
      { value: { latitude: 3, longitude: 4 }, label: 'Paris - France' },
    ]);
  });

  it('should call callback with empty array if no data', async () => {
    // Arrange
    fetchGeocodingMock.mockResolvedValueOnce({
      data: { searchGeocoding: undefined },
    });
    const { result } = renderHook(() => useDebouncedGeocodingSearch(1000));
    const callback = vi.fn();

    // Act
    await act(async () => {
      result.current.debouncedFetchLocations('nowhere', callback);
    });

    // Assert
    expect(callback).toHaveBeenCalledWith([]);
  });

  it('should return loading state', () => {
    // Arrange
    const { result } = renderHook(() => useDebouncedGeocodingSearch());
    // Assert
    expect(result.current.loading).toBe(false);
  });
});
