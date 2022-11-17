import React, { useState } from "react";
import "./Dropdown.css";

/**
 * Custom Dropdown component
 *
 * options - list of options object {id, data}
 * isMultiSelect - default value is false
 * selected - state to store ids
 * setSelected - function to update selected state
 * @return Dropdown Component
 */
const Dropdown = ({
  options,
  isMultiSelect = false,
  selected,
  setSelected,
}) => {
  const [show, setShow] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  /**
   * Toggle Options to add or remove elements from selected list
   * Also, close the dropdown if its not multiselect
   */
  const toggleOption = ({ id }) => {
    setSelected((prevSelected) => {
      // if it's in, remove
      const newArray = isMultiSelect ? [...prevSelected] : [];
      if (newArray.includes(id)) {
        return newArray.filter((item) => item !== id);
        // else, add
      } else {
        newArray.push(id);
        return newArray;
      }
    });
    if (!isMultiSelect) {
      setShow(false);
    }
  };

  /**
   * Render options
   * @returns list of options
   */
  const renderOptions = () => {
    return (
      <>
        {isMultiSelect ? (
          <li className="custom-select-option" onClick={toggleSelectAll}>
            <input
              className="custom-select-option-checkbox"
              type="checkbox"
              checked={selectAll}
            />
            <span>Select All</span>
          </li>
        ) : (
          <li
            className="custom-select-option"
            onClick={() => {
              setSelected([]);
              setShow(false);
            }}
          >
            Select
          </li>
        )}
        {options.map((option, idx) => {
          const isSelected = selected.includes(option.id);
          return (
            <li
              key={idx}
              className="custom-select-option"
              onClick={() => toggleOption({ id: option.id })}
            >
              {isMultiSelect && (
                <input
                  className="custom-select-option-checkbox"
                  type="checkbox"
                  checked={isSelected}
                />
              )}
              <span>{option.title} </span>
            </li>
          );
        })}
      </>
    );
  };

  /**
   * Select All will either select or deselect all options
   */
  const toggleSelectAll = () => {
    selectAll
      ? setSelected([])
      : setSelected(() => options.map((option) => option.id));
    setSelectAll(!selectAll);
  };

  return (
    <div className="multi-select-dropdown">
      <div onClick={() => setShow(!show)} className="custom-select-selected">
        <div className="custom-select-text">
          {selected.length === 0
            ? isMultiSelect
              ? "Select All"
              : "Select"
            : options
                .filter((option) => selected.includes(option.id))
                .map((option) => option.title)
                .join(", ")}
        </div>
        <span> {show ? <>&#9650; </> : <>&#9660;</>}</span>
      </div>
      {show && <ul className="custom-select-options">{renderOptions()}</ul>}
    </div>
  );
};

export default Dropdown;
