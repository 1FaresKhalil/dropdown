import CategoryDropdowns from '@/components/CategoryDropdowns';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main meta={<Meta title="dropdown menu" description="Next starter Fares" />}>
      <div className="h-screen flex flex-col section-mt items-center">
        <div className="font-size-32">Select your category</div>
        <CategoryDropdowns />
      </div>
    </Main>
  );
};

export default Index;
