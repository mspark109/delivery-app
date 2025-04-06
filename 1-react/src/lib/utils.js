export const getComponentName = ({displayName, name}) => {
  return displayName || name || "Component"
};