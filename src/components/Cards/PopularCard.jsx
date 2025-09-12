// import React from "react";
// import "../Cards/card.css";
// import { Card, Stack } from "react-bootstrap";
// import { NavLink } from "react-router-dom";

// const PopularCard = ({ val }) => {
//   return (
//     <Card className="rounded-2 shadow-sm popular">
//       {/* Image */}
      
//       <Card.Img
//         variant="top"
//         src={val.image}
//         className="img-fluid"
//         alt={val.title}
//       />

//       {/* Body */}
//       <Card.Body>
//         {/* Location */}
//         <Card.Text>
//           <i className="bi bi-geo-alt"></i>
//           <span className="text ms-1">{val.location}</span>
//         </Card.Text>

//         {/* Title (link to details) */}
//         <Card.Title>
//           <NavLink
//             className="body-text text-dark text-decoration-none"
//             to={`/tour/${val.slug}`}
//           >
//             {val.title}
//           </NavLink>
//         </Card.Title>

//         {/* Ratings */}
//         <p className="review">
//           <i className="bi bi-star-fill me-1 text-warning"></i>
//           <span>{val.rating}</span>
//           <span className="ms-1">( {val.reviews} reviews )</span>
//         </p>

//         {/* Categories (badges) */}
//         {val.category?.map((cat, index) => (
//           <span
//             key={index}
//             className={`${cat.replace(/ .*/, "")} badge me-1`}
//           >
//             {cat}
//           </span>
//         ))}
//       </Card.Body>

//       {/* Footer */}
//       <Card.Footer className="py-3">
//         {/* Price (with discount if available) */}
//         {val.afterDiscount && (
//           <p className="text-muted text-decoration-line-through mb-1">
//             ₹{val.price.toFixed(2)}
//           </p>
//         )}
//         <Stack direction="horizontal" className="justify-content-between mt-2">
//           <p className="mb-0">
//             From{" "}
//             <b>
//               ₹
//               {val.afterDiscount
//                 ? val.afterDiscount.toFixed(2)
//                 : val.price.toFixed(2)}
//             </b>
//           </p>
//           <p className="mb-0">
//             <i className="bi bi-clock"></i> {val.days}
//           </p>
//         </Stack>
//       </Card.Footer>
//     </Card>
//   );
// };

// export default PopularCard;
import React from "react";
import "../Cards/card.css";
import { Card, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const PopularCard = ({ val }) => {
  return (
    <Card className="rounded-2 shadow-sm popular">
      {/* Image */}
      <NavLink to={`/tour/${val.id}`}>
        <Card.Img
          variant="top"
          src={val.image}
          className="img-fluid"
          alt={val.title}
        />
      </NavLink>

      {/* Body */}
      <Card.Body>
        {/* Location */}
        <Card.Text>
          <i className="bi bi-geo-alt"></i>
          <span className="text ms-1">{val.location}</span>
        </Card.Text>

        {/* Title (clickable link to details) */}
        <Card.Title>
          <NavLink
            className="body-text text-dark text-decoration-none"
            to={`/tour/${val.slug}`}
          >
            {val.title}
          </NavLink>
        </Card.Title>

        {/* Ratings */}
        <p className="review">
          <i className="bi bi-star-fill me-1 text-warning"></i>
          <span>{val.rating}</span>
          <span className="ms-1">( {val.reviews} reviews )</span>
        </p>

        {/* Categories */}
        {val.category?.map((cat, index) => (
          <span
            key={index}
            className={`${cat.replace(/ .*/, "")} badge me-1`}
          >
            {cat}
          </span>
        ))}
      </Card.Body>

      {/* Footer */}
      <Card.Footer className="py-3">
        {/* Price */}
        {val.afterDiscount && (
          <p className="text-muted text-decoration-line-through mb-1">
            ₹{val.price.toFixed(2)}
          </p>
        )}

        <Stack
          direction="horizontal"
          className="justify-content-between mt-2"
        >
          <p className="mb-0">
            From{" "}
            <b>
              ₹
              {val.afterDiscount
                ? val.afterDiscount.toFixed(2)
                : val.price.toFixed(2)}
            </b>
          </p>
          <p className="mb-0">
            <i className="bi bi-clock"></i> {val.days}
          </p>
        </Stack>
      </Card.Footer>
    </Card>
  );
};

export default PopularCard;
