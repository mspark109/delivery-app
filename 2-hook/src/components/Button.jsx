const Button =({ styleType, block, ...rest}) => {

  let className ="Button ";
  if(styleType) className += styleType;

  return (
    <button className={className} {...rest} />
  )
}

export default Button;