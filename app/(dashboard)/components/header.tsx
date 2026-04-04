import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full gap-4">
      <Input placeholder="Search bookmarks..." className="max-w-sm" />
      <div>
        <Button className='cursor-pointer'>
          <Plus /> Add Bookmark
        </Button>
      </div>
    </div>
  );
};

export default Header;
