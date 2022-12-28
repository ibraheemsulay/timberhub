import { S_productItem } from "./S_productItem";
import ProductIcon from "../../../../../assets/icons/ProductIcon";
import { IProductItem } from "../../../../../ts-types/resuableCompTypes";
import {
  formatDate,
  getProductDimensionsDuplicates,
} from "../../../../../utils";
import { memo } from "react";
import Link from "next/link";

const ProductItem: React.FC<IProductItem> = ({ product }) => {
  return (
    <Link href={`/${product.id}`} passHref>
      <S_productItem data-test="product-item">
        <div>
          <ProductIcon />
          <div className="wrapper">
            <div>
              <p className="categories" data-test="categories">
                {product.species}, {product.grade}, {product.drying_method},{" "}
                {product.usage}, {product.treatment}
              </p>
              <p>
                <mark>#{product.id?.slice(0, 6) + "..."}</mark>{" "}
                <span>{formatDate(product.created)}</span>
              </p>
            </div>
            <div className="measurements">
              {/* group the dimensions with the same thickness and width*/}
              {getProductDimensionsDuplicates(product).map((val, i) => {
                if (i > 2) return;
                return (
                  <p key={val[0]}>
                    <span>{val[1]}</span>
                    {val[0]}
                  </p>
                );
              })}

              {/* Checks if there are more items in the array 
            and shows the number left*/}
              {getProductDimensionsDuplicates(product).length - 3 > 0 ? (
                <p>
                  {getProductDimensionsDuplicates(product).length - 3} more sets
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </S_productItem>
    </Link>
  );
};

export default memo(ProductItem);
