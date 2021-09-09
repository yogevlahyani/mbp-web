import dynamic from 'next/dynamic';
import config from '../../config';

const {
  providers: { netlifyCMS },
} = config;

const CMS = dynamic(
  () =>
    import('netlify-cms-app').then((CMS: any) => CMS.init({ config: netlifyCMS })),
  {
    ssr: false,
    loading: function loading() {
      return <div>Loading..</div>;
    },
  },
);

const AdminPage: React.FC = () => {
  return <CMS />;
};

export default AdminPage;
