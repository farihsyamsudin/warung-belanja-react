import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { NumberWithComma } from "../utils/function";

const CardProduct = ({image, productName, productPrice, productDetail, masukKeranjang}) => {
    return (
        <Card className="mt-6 w-[250px]">
            <CardHeader color="blue-gray" className="relative">
                <img
                    src={image}
                    alt={image}
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {productName}
                </Typography>
                <Typography className="mb-2">
                    {productDetail}
                </Typography>
                <Typography color="inherit" variant="h6">
                    Harga : Rp. {NumberWithComma(productPrice)}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button onClick={masukKeranjang}>Pilih</Button>
            </CardFooter>
        </Card>
    )
}

export default CardProduct