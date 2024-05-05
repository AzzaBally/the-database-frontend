import { useParams } from "react-router";
import Layout from "../Layout/Layout";

export default function ShowItem() {
  const { id } = useParams();
  return (
    <Layout>
      <hr />
      <div>Hello {id}</div>
    </Layout>
  );
}
