import app from "./app";
import orderRouter from "./routes/order";
import productRouter from "./routes/product";
import userRouter from "./routes/user";

app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/order', orderRouter)

app.listen(3000, () => console.log('listening'))