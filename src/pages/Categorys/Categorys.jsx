import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import useAxiosPrivet from "../../hooks/useAxiosPrivet/useAxiosPrivet";
import { useEffect, useState } from "react";

const Categorys = () => {
  const axiosPublic = useAxiosPublic();
  const axiosPrivet = useAxiosPrivet();
  const [categorys, setCategorys] = useState();
  const [isShow, setIsShow] = useState(false);
  const [category, setCategory] = useState({ categoryName: "" });
  const [isCategoryShow, setcategoryShow] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
  });

  useEffect(() => {
    axiosPublic.get("category").then((res) => setCategorys(res.data.data));
  }, [axiosPublic, axiosPrivet, categorys]);

  const handleDelete = (id) => {
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
          .delete(`category/delete/${id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the category.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Access form data from 'formData' state
    try {
      if (formData.categoryName === "") {
        return Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Category name and group must input!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // console.log("in try block", category.categoryName._id)
      if (isCategoryShow) {
        const updatedCategory = await axiosPrivet.patch(
          `category/update/${category.categoryName._id}`,
          formData
        );
        if (updatedCategory.data.message) {
          // Reset form data to clear the input values
          setFormData({
            categoryName: "",
          });
          setCategory({
            categoryName: "",
          });

          return Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Company added successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          return Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Faild to update!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
      const register = await axiosPublic.post("category/add", formData);
      if (register.data.message) {
        // Reset form data to clear the input values
        setFormData({
          categoryName: "",
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Company added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "This Company already exist!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleUpdate = async (id) => {
    setcategoryShow(true);
    const category = await axiosPrivet
      .get(`category?id=${id}`)
      .then((res) => res.data.data[0]);
    setCategory({ categoryName: category });
    setIsShow(true);
    setFormData({ categoryName: category.categoryName });
    // console.log(category)
  };

  return (
    <>
      {!isShow && (
        <div className="px-5 my-5">
          <button
            onClick={() => setIsShow(true)}
            className="btn btn-sm btn-primary"
          >
            Add Category
          </button>
        </div>
      )}

      {isShow && (
        <div>
          <form
            className="lg:w-1/3 md:w-2/3 w-full flex flex-col gap-4 mx-auto border p-5 rounded-lg my-5 bg-gray-100 shadow-xl"
            onSubmit={handleSubmit}
          >
            <h4 className="text-center text-2xl font-bold">
              Category Add Form
            </h4>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-lg font-medium text-gray-600"
              >
                Category Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.categoryName} // Fixed value attribute to show form state
                onChange={(e) =>
                  setFormData({ ...formData, categoryName: e.target.value })
                }
                placeholder="Enter Category Name"
                className="border rounded-md py-1 px-3 border-gray-600"
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categorys?.map((category, index) => (
              <tr key={category?._id}>
                <th>{index + 1}</th>
                <td>{category?.categoryName?.toUpperCase()}</td>
                {/* Fixed 'groupe' to 'group' */}
                <td>
                  <button
                    onClick={() => handleUpdate(category._id)}
                    className="btn btn-sm text-black btn-accent"
                  >
                    <AiFillEdit className="text-white text-base md:text-xl" />
                  </button>{" "}
                  <button className="btn btn-sm btn-warning">
                    <AiFillDelete
                      onClick={() => handleDelete(category._id)}
                      className="text-purple-900 text-base md:text-xl"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Categorys;
