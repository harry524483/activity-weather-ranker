import AsyncSelect from 'react-select/async';
import type { CallbackFn, LocationOption } from '../types';

type SearchProps = {
  loadOptions: (inputValue: string, callback: CallbackFn) => void;
  loading: boolean;
  onChange: (selectedOption: LocationOption | null) => void;
};

const Search = ({ loadOptions, loading, onChange }: SearchProps) => (
  <div className="w-full max-w-xl mb-10">
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions={false}
      isLoading={loading}
      placeholder="Search for a location..."
      onChange={onChange}
    />
  </div>
);

export default Search;
