import React, { useState } from "react";
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCartData, addQuantity, fetchCartData, removeCartData } from "../cartSlice";

const Cartcard = ({ product }) => {
  console.log(product)
  const dispatch = useDispatch();

  const handleRemove = ()=>{
    dispatch(removeCartData(product.product._id))
    .then(()=>dispatch(fetchCartData()))
  }
  const handleAdd = ()=>{
    dispatch(addQuantity(product.product._id))
    .then(()=>dispatch(fetchCartData()))
  }
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', maxWidth: 345, m: 2, boxShadow: 3, borderRadius: 2 }}>
      {/* Product Image */}
      <CardMedia
        component="img"
        height="200"
        image={product.product.image}
        alt={product.product.title}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1  }}>
        <Typography variant="h6" component="div" gutterBottom>
          {product.product.title}
        </Typography>
        <Typography variant="body2" sx={{ flexGrow: 1, flexDirection: "column"}} color="text.secondary">
          {product.product.description}
        </Typography>
        <Typography variant="h6" sx={{ mt: "auto",fontWeight: "bold", color: "primary.main" }}>
          ${product.product.price}
        </Typography>
      </CardContent>

      <CardActions>
          <Button size="small" variant="contained" color="primary" fullWidth>
            Remove
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
          <IconButton
            onClick={handleRemove}
            color="secondary"
            disabled={product.quantity <= 0} // Disable if quantity is 1
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1" sx={{ mx: 1 }}>
            {product.quantity}
          </Typography>
          <IconButton onClick={handleAdd} color="primary">
            <AddIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Cartcard;
