import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = () => (
    <ContentLoader
    className="pizza-block" 
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 315 535"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"

  >
    <circle cx="140" cy="130" r="130" /> 
    <rect x="0" y="265" rx="10" ry="10" width="280" height="30" /> 
    <rect x="128" y="425" rx="23" ry="23" width="152" height="45" /> 
    <rect x="0" y="434" rx="10" ry="10" width="90" height="27" /> 
    <rect x="0" y="315" rx="10" ry="10" width="280" height="90" />
  </ContentLoader>
)

export default Skeleton