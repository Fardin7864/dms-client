import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import useAxiosPrivet from "../../hooks/useAxiosPrivet/useAxiosPrivet";
import { useEffect, useState } from "react";

const Companys = () => {
  const axiosPublic = useAxiosPublic();
  const axiosPrivet = useAxiosPrivet();
  const [companys, setCompanys] = useState();
  const [isShow, setIsShow] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    group: "", // Fixed typo here, should be 'group' instead of 'groupe'
  });

  useEffect(() => {
    axiosPublic.get("company").then((res) => setCompanys(res.data.data));
  }, [axiosPublic, companys]);


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
          .delete(`company/delete-company/${id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting company:", error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the company.",
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
      const register = await axiosPublic.post(
        "company/register-company",
        formData
      );
      if (register.data.message === "Company registerd succussfully!") {
        // Reset form data to clear the input values
        setFormData({
          companyName: "",
          group: "",
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
      // Reset form data to clear the input values
      setFormData({
        companyName: "",
        group: "",
      });
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "This Company already exist!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      {!isShow && (
        <div className="px-5 my-5">
          <button
            onClick={() => setIsShow(true)}
            className="btn btn-md btn-primary"
          >
            Add Company
          </button>
        </div>
      )}

      {isShow && (
        <div>
          <form
            className="lg:w-1/3 md:w-2/3 w-full flex flex-col gap-4 mx-auto border p-5 rounded-lg my-5 bg-gray-100 shadow-xl"
            onSubmit={handleSubmit}
          >
            <h4 className="text-center text-2xl font-bold">Company Add Form</h4>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-lg font-medium text-gray-600"
              >
                Company Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.companyName} // Fixed value attribute to show form state
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                placeholder="Enter Company Name"
                className="border rounded-md py-1 px-3 border-gray-600"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="group"
                className="text-gray-600 text-lg font-medium"
              >
                Group Name
              </label>
              <input
                type="text"
                name="group"
                value={formData.group} // Fixed value attribute to show form state
                onChange={(e) =>
                  setFormData({ ...formData, group: e.target.value })
                }
                placeholder="Enter Group Name"
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
              <th>Company Name</th>
              <th>Group</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {companys?.map((company, index) => (
              <tr key={company?._id}>
                <th>{index + 1}</th>
                <td>{company?.companyName?.toUpperCase()}</td>
                <td>{company?.group?.toUpperCase()}</td>{" "}
                {/* Fixed 'groupe' to 'group' */}
                <td>
                  <button className="btn btn-sm text-black btn-accent">
                    <AiFillEdit className="text-white text-base md:text-xl" />
                  </button>{" "}
                  <button className="btn btn-sm btn-warning">
                    <AiFillDelete
                      onClick={() => handleDelete(company._id)}
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

export default Companys;
