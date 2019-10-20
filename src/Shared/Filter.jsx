import { Flex } from "@rebass/grid";
import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

export const Primitive = props => (
  <Flex width={1}>
    <input
      type="text"
      value={props.searchString}
      onChange={props.handleChange}
    />
    <button onClick={props.handleSubmit}>search</button>
    <button onClick={props.handleReset}>reset</button>
  </Flex>
);

Primitive.propTypes = {
  searchString: PropTypes.string,
  handleReset: PropTypes.func,
  handleSubmit: PropTypes.func
};

///////////////////////

export const Container = ({ onSubmit }) => {
  const [searchString, setSearchString] = useState("");
  const [submitOnChange, setSubmitOnChange] = useState(false);
  const handleChange = useCallback(
    event => {
      setSearchString(event.target.value);
    },
    [setSearchString]
  );

  const handleSubmit = useCallback(() => {
    onSubmit({
      q: searchString
    });
  }, [onSubmit, searchString]);

  const handleReset = useCallback(() => {
    setSubmitOnChange(true);
    setSearchString("");
  }, [setSearchString]);

  useEffect(() => {
    if (submitOnChange) {
      setSubmitOnChange(false);
      handleSubmit();
    }
  }, [handleSubmit, submitOnChange, setSubmitOnChange]);

  const newProps = {
    searchString,
    handleChange,
    handleReset,
    handleSubmit
  };

  return <Primitive {...newProps} />;
};

Container.propTypes = {
  onSubmit: PropTypes.func
};

export default Container;
