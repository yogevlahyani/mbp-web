import dynamic from "next/dynamic";
import { Skeleton } from "@chakra-ui/react";
import config from "../../config";

const {
  providers: { netlifyCMS },
} = config;

const CMS = dynamic(
  () =>
    import("netlify-cms-app").then((CMS: any) =>
      CMS.init({ config: netlifyCMS })
    ),
  {
    ssr: false,
    loading: Skeleton,
  }
);

const AdminPage: React.FC = () => {
  return <CMS />;
};

export default AdminPage;
