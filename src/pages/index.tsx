import type { NextPage } from "next";
import ContextWrapper from "../components/others/ContextWrapper/ContextWrapper";
import Products from "../components/Products/Products";
import AddProductModal from "../components/Products/AddProductModal/AddProductModal";
import { ProductType } from "../ts-types/dataTypes";
import dbConnect from "../lib/connectToDB";
import { ProductModel } from "../lib/model";

export async function getServerSideProps() {
  await dbConnect();
  const res = await ProductModel.find({})
    .sort({ created: -1 })
    .lean({ virtuals: true })
    .exec();

  return {
    props: {
      data: JSON.parse(JSON.stringify(res)) as ProductType[],
    },
  };
}

const Home: NextPage<{ data: ProductType[] }> = ({ data }) => (
  <ContextWrapper fetchedData={data}>
    <>
      <Products />
      <AddProductModal />
    </>
  </ContextWrapper>
);

export default Home;
