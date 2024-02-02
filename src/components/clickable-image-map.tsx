import React, { useEffect, useState } from "react";
import "../App.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/actions";
import { any } from "prop-types";

const ClickableImageMap = () => {
  const [pieceSeleted, setpieceSelected] = useState(null);
  const cartItems = useSelector((state: any) => state.cartItems);
  const [qts, setQts] = useState(1);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...pieceSeleted, qts: qts }));
    setpieceSelected(null);
  };

  const handleQuantityChange = (value) => {
    qts + value > 0 && setQts(qts + value);
  };

  const areas = [
    {
      shape: "circle",
      coords: [50, 200, 15],
      id: 1,
      title: "1",
      name: "Door",
      price: 14.0,
      stock: 400,
    },
    {
      shape: "circle",
      coords: [300, 300, 15],
      id: 2,
      title: "2",
      name: "Flat",
      price: 3.0,
      stock: 400,
    },
    {
      shape: "circle",
      coords: [180, 180, 15],
      id: 3,
      title: "3",
      name: "Button go/stop",
      price: 11.0,
      stock: 400,
    },
    {
      shape: "circle",
      coords: [470, 90, 15],
      id: 4,
      title: "4",
      name: "Fan",
      price: 51.0,
      stock: 400,
    },
  ];

  const [tooltips, setTooltips] = useState(
    areas.map((area) => ({
      visible: true,
      x: area.coords[0],
      y: area.coords[1],
      title: area.title,
      price: area.price,
      stock: area.stock,
      name: area.name,
    }))
  );

  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const imageElement = document.querySelector("#four");
    if (imageElement) {
      const rect = imageElement.getBoundingClientRect();
      setImagePosition({ x: rect.left, y: rect.top });
      console.log("top", rect.top);
      console.log("top", rect.left);
    }
  }, [pieceSeleted]);

  useEffect(() => {
    const handleResize = () => {
      const imageElement = document.querySelector("#four");
      if (imageElement) {
        const rect = imageElement.getBoundingClientRect();
        setImagePosition({ x: rect.left, y: rect.top });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const [tooltip, setTooltip] = useState({ visible: true, x: 0, y: 0, title: '' });

  const handleAreaClick = (areaId: number) => {
    // Handle the click event for each area
    alert(`Area ${areaId} clicked!`);
  };

  return (
    <div className="container-page">
      <img
        src="/images/420697641_314941711010510_1376939854292051621_n.jpg" // Replace with the actual path to your image
        alt="Your Image"
        useMap="#shapes-map"
        id="four"
      />
      <map name="shapes-map">
        {areas.map((area, index) => {
          // const tooltip = { visible: true, x: area.coords[0], y: area.coords[1], title: area.title };
          return (
            <React.Fragment key={area.id}>
              <area
                shape={area.shape}
                coords={area.coords.join(",")}
                href="#"
                alt={`Area ${area.id}`}
                title={area.title}
              />
              {tooltips[index].visible && (
                <div
                  onClick={() =>
                    setpieceSelected(
                      pieceSeleted?.title == tooltips[index].title
                        ? null
                        : tooltips[index]
                    )
                  }
                  style={{
                    position: "absolute",
                    top: imagePosition.y + tooltips[index].y - 15 + "px",
                    left: imagePosition.x + tooltips[index].x - 15 + "px",
                    width: "30px",
                    height: "30px",
                    background: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "50%",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                    zIndex: 9999,
                  }}
                >
                  {tooltips[index].title}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </map>
      {pieceSeleted !== null && (
        <div className="description-container">
          <div className="piece-info">
            <h3>{pieceSeleted.name}</h3>
            <p>Price: {(pieceSeleted.price)} €</p>
            <button
              onClick={() => handleQuantityChange(-1)}
              className="qts-button"
            >
              -
            </button>
            {qts}
            <button
              onClick={() => handleQuantityChange(1)}
              className="qts-button"
            >
              +
            </button>
            <p>
              Stock:
              {pieceSeleted.stock}
            </p>
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <IoIosCloseCircleOutline
            size={30}
            className="close-icon"
            onClick={() => setpieceSelected(null)}
          />
        </div>
      )}
    </div>
  );
};

export default ClickableImageMap;
