import {
  Button,
  CloseButton,
  Dialog,
  Input,
  Portal,
  createOverlay,
} from "@chakra-ui/react";
import { useState } from "react";

interface DialogProps {
  title: string;
  description?: string;
  content?: React.ReactNode;
  product: any;
  onActionClick?: (id: any, product: any) => Promise<void>;
}

const ProductDialog = createOverlay<DialogProps>((props) => {
  const { title, description, product, onActionClick, ...rest } = props;
  const [updatedProduct, setUpdatedProduct] = useState(product);

  return (
    <Dialog.Root {...rest} placement={"center"} motionPreset="slide-in-bottom">
      <Portal>
        <Dialog.Backdrop background="rgba(0, 0, 0, 0.1)" />
        <Dialog.Positioner>
          <Dialog.Content>
            {title && (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body spaceY="4">
              {description && (
                <Dialog.Description>{description}</Dialog.Description>
              )}
              <>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Price"
                  name="price"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Image URL"
                  name="image"
                  value={updatedProduct.image}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    })
                  }
                />
              </>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                bgColor={"blue.500"}
                onClick={() => onActionClick?.(product._id, updatedProduct)}
              >
                Update
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

export default ProductDialog;
