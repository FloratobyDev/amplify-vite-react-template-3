/**
  first_name
  last_name
  status
  connections

 */

import Connection from "./Connection";
import Navbar from "./Navbar";
import Recommendations from "./Recommendations";

function UserFeed() {
  return (
    <div className="flex flex-col gap-y-2 h-full">
      <Navbar />
      <div className="flex flex-1 shadow-sm h-full overflow-auto">
        <div className="overflow-auto h-full flex flex-col flex-1 gap-y-4 p-2">
          <div className="join flex bg-blue-200">
            <div className="flex-1">
              <input
                className="input input-bordered join-item w-full"
                placeholder="Search"
              />
            </div>
            <select className="select select-bordered join-item">
              <option disabled selected>
                Filter
              </option>
              <option>Sci-fi</option>
              <option>Drama</option>
              <option>Action</option>
            </select>
            <select className="select select-bordered join-item">
              <option disabled selected>
                Filter
              </option>
              <option>Sci-fi</option>
              <option>Drama</option>
              <option>Action</option>
            </select>
            <select className="select select-bordered join-item">
              <option disabled selected>
                Filter
              </option>
              <option>Sci-fi</option>
              <option>Drama</option>
              <option>Action</option>
            </select>
            <select className="select select-bordered join-item">
              <option disabled selected>
                Filter
              </option>
              <option>Sci-fi</option>
              <option>Drama</option>
              <option>Action</option>
            </select>
            <select className="select select-bordered join-item">
              <option disabled selected>
                Filter
              </option>
              <option>Sci-fi</option>
              <option>Drama</option>
              <option>Action</option>
            </select>
          </div>
          <Recommendations />
        </div>
        <Connection />
      </div>
    </div>
  );
}

export default UserFeed;
