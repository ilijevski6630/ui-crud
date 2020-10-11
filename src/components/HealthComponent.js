import React from "react";

// class HealthComponent extends React.Component {
//     render() {
//         return (
//             export const HealthComponent = () => (
//                 <>’{status: “UP”}’</>
//             );
//         )
//     }
// }
//
// export default HealthComponent

const status = '{"status":"UP"}'

const HealthComponent = () => (
    <pre>{status}</pre>
);

export default HealthComponent