import React from "react";
import { useState } from "react";

const GenderCheckbox = () => {
  const [gender, setGender] = useState(null);
  return (
    <div className="flex">
      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text text-gray-200 p-2">Male</span>
          <input
            type="checkbox"
            name="Gender"
            value="Male"
            checked={gender === "Male"} //this checks the checkbox only if state variable value is Male and by default state var value is null.
            onChange={(e) => setGender(e.target.value)}
            className="checkbox checkbox-info border-slate-900"
          />
        </label>
      </div>

      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text text-gray-200 p-2">Female</span>
          <input
            type="checkbox"
            name="Gender"
            value="Female"
            checked={gender === "Female"} //this checks the checkbox only if state variable value is Male and by default state var value is null..
            onChange={(e) => setGender(e.target.value)}
            className="checkbox checkbox-info border-slate-900"
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;

{
  /* <div className="form-control">
  <label className="cursor-pointer label">
    <span className="label-text">Remember me</span>
    <input type="checkbox" checked="checked" className="checkbox checkbox-info" />
  </label>
</div> */
}
