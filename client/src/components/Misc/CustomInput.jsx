import { FormControl, FormLabel, InputGroup, Input } from "@chakra-ui/react";

const CustomInput = ({
  id,
  isRequired,
  label,
  leftIcon,
  rightIcon,
  type,
  name,
  placeholder,
  children,
  ...rest
}) => {
  return (
    <FormControl
      id={id}
      isRequired={isRequired}
      mb="25px"
      minW="350px"
      maxW="600px"
      {...rest}
    >
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        {leftIcon}
        <Input type={type} name={name} placeholder={placeholder} />
        {rightIcon}
      </InputGroup>
      {children}
    </FormControl>
  );
};

export default CustomInput;
