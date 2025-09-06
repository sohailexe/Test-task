import { Search } from 'lucide-react';
const SearchInput = () => {
  {
    /* ToDo add search functionality */
  }

  return (
    <form className='flex w-full max-w-[700px]'>
      <div className='relative w-full'>
        <input
          type='text'
          placeholder='search'
          className='w-full pl-4 py-2 rounded-l-full border focus:outline-none focus:border-blue-500 '
        />
        {/* ToDo add remove  search btn  */}
      </div>

      <button
        type='submit'
        className='px-5 bg-accent border border-l-0 rounded-r-full hover:bg-accent/70 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <Search className='size-5' />
      </button>
    </form>
  );
};

export default SearchInput;
