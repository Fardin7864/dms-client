import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosPrivet from "../../hooks/useAxiosPrivet/useAxiosPrivet";

const Products = () => {
  const [products, setProducts] = useState();
  const [companys, setCompanys] = useState();
  const [categorys, setCategorys] = useState();
  const [isShow, setIsShow] = useState(false);
  const [render, setRender] = useState(1);
  const [updateProduct, setupdateProduct] = useState()
  const [productPhoto, setproductPhoto] = useState({
    photo: {},
  });
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    category: "",
    company: "",
    wet: "",
    photo: "",
  });
  const axiosPublic = useAxiosPublic();
  const axiosPrivet = useAxiosPrivet();

  useEffect(() => {
    axiosPublic.get("product").then((res) => setProducts(res.data.data));
    axiosPublic.get("company").then((res) => setCompanys(res.data.data));
    axiosPublic.get("category").then((res) => setCategorys(res.data.data));
  }, [render]);

  const company = (id) => {
    const selectedCompany = companys?.find((company) => company._id === id);
    return (
      selectedCompany &&
      selectedCompany.companyName.charAt(0).toUpperCase() +
        selectedCompany.companyName.slice(1)
    );
  };

  const group = (id) => {
    const selectedCompany = companys?.find((company) => company._id === id);
    return (
      selectedCompany &&
      selectedCompany.group.toUpperCase()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    // formData.photo = productPhoto;
    const product = {
      productName: formData.productName,
      price: formData.price,
      category: formData.category,
      company: formData.company,
      wet: formData.wet,
    };
    try {
      // console.log(product);
      if(updateProduct){
         const update = await axiosPrivet.put(`product/update/${updateProduct._id}`,product);
         if (update.data.message) {
            setFormData({
              productName: "",
              price: "",
              category: "",
              company: "",
              wet: "",
              photo: "",
            });
            setRender(render + 1);
    
           return Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Product updated successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
          }else{
           return Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Product updated Faild!",
                showConfirmButton: false,
                timer: 1500,
              });
          }
      }
      const response = await axiosPublic.post("product/add", product);
      if (response.data.message === "Product Created successfully!") {
        setFormData({
          productName: "",
          price: "",
          category: "",
          company: "",
          wet: "",
          photo: "",
        });
        setRender(render + 1);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      // Handle errors such as network issues or server errors
      //   console.error("Error submitting form:", error.message);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Request faild!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDelete = async (id) => { 
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosPrivet
            .delete(`product/delete/${id}`)
            .then(() => {
                setRender(render+1)
              Swal.fire({
                title: "Deleted!",
                text: "Product has been deleted.",
                icon: "success",
              });
            })
            .catch((error) => {
              console.error("Error deleting company:", error);
              Swal.fire({
                title: "Error!",
                text: "An error occurred while deleting the product.",
                icon: "error",
              });
            });
        }
      });
  }

  const handleUpdate = async (id) => { 
    setupdateProduct(null)
    const product = await axiosPrivet.get(`product?id=${id}`).then(res => res.data.data[0]);
    console.log(product)
    setupdateProduct(product)
    // const productT = await axiosPrivet.get(`product?id=${id}`).then(res => res.data.data);
    // console.log(updateProduct)
    setIsShow(true)
    setFormData({
        productName: product.productName,
        price: product.price,
        category: product.category,
        company: product.company,
        wet: product.wet,
        
    })
    // setupdateProduct("")
    // console.log(category)
 }

  return (
    <div className="px-5 py-5">
      {!isShow && (
        <div className="px-5 my-5">
          <button
            onClick={() => setIsShow(true)}
            className="btn btn-sm btn-primary"
          >
            Add Company
          </button>
        </div>
      )}
      {isShow && (
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 mx-auto border p-5 rounded-lg my-5 bg-gray-100 shadow-xl"
          // onSubmit={handleSubmit}
        >
          <h4 className="text-center text-2xl font-bold">Product Add Form</h4>
          <div className="flex gap-5 justify-center w-full">
            <div className="flex flex-col gap-2 w-1/2">
              <label
                htmlFor="name"
                className="text-lg font-medium text-gray-600"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
                placeholder="Enter Product Name"
                className="border rounded-md py-1 px-3 border-gray-600"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label
                htmlFor="price"
                className="text-gray-600 text-lg font-medium"
              >
                Price
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="Enter Price"
                className="border rounded-md py-1 px-3 border-gray-600"
              />
            </div>
          </div>
          {/* 2nd line */}
          <div className="flex gap-5 justify-center w-full">
            <div className="flex flex-col gap-2 w-1/2">
              <label
                htmlFor="category"
                className="text-lg font-medium text-gray-600"
              >
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="border rounded-md py-1 px-3 border-gray-600"
              >
                <option>Select Category</option>

                {categorys?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName.charAt(0).toUpperCase() +
                      category.categoryName.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label
                htmlFor="company"
                className="text-lg font-medium text-gray-600"
              >
                Company
              </label>
              <select
                name="company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="border rounded-md py-1 px-3 border-gray-600"
              >
                <option>Select Company</option>
                {companys?.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.companyName.charAt(0).toUpperCase() +
                      company.companyName.slice(1)}{" "}
                    Group: {company.group.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* 3rd line */}
          <div className="flex gap-5 justify-center w-full">
            <div className="flex flex-col gap-2 w-1/2">
              <label
                htmlFor="wet"
                className="text-lg font-medium text-gray-600"
              >
                Wet
              </label>
              <input
                type="text"
                name="wet"
                value={formData.wet}
                onChange={(e) =>
                  setFormData({ ...formData, wet: e.target.value })
                }
                placeholder="Enter Wet"
                className="border rounded-md py-1 px-3 border-gray-600"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label
                htmlFor="photo"
                className="text-lg font-medium text-gray-600"
              >
                Photo
              </label>
              <input
                type="file"
                name="photo"
                onChange={(e) => setproductPhoto({ photo: e.target.files[0] })}
                className="border rounded-md py-1 px-3 border-gray-600"
              />
            </div>
          </div>
          <div className=" flex justify-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5">
        {products?.map((product) => (
          <div key={product._id} className="card bg-base-100 shadow-xl">
            {/* <figure>
              <img src={product.photo} alt={product.productName} />
            </figure> */}
            <div className="card-body">
              <h2 className="card-title">
                {product.productName.charAt(0).toUpperCase() +
                  product.productName.slice(1)}
              </h2>
              <p>Price: {product.price}৳</p>
              <p>Wet: {product.wet} gm</p>
              <p>Company: {company(product.company)}</p>
              <p>Group: {group(product.company)}</p>
            </div>
            <div className=" flex justify-between w-full p-5">
                <button onClick={() => handleUpdate(product._id)} className="btn btn-accent btn-sm">Edit</button>
                <button onClick={()=>handleDelete(product._id)} className="btn btn-warning btn-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
