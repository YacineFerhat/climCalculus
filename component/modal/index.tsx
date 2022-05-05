import React, {
  ReactNode,
} from 'react';
import { Dialog, DialogContent, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: any;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide direction="up" mountOnEnter unmountOnExit ref={ref} {...props}>
      {props.children}
    </Slide>
  );
});

interface Props {
  children: ReactNode;
  isOpen: boolean;
  handleClose: (e: boolean) => void;
}

export const Modal = (props: Props) => {
  const { isOpen, handleClose, children } = props;
  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={() => handleClose(false)}
        PaperProps={{
          style: { borderRadius: 16 },
        }}
      >
        <DialogContent>
          <div className="text-center bg-white rounded-full pt-5 pb-10 opacity-100 z-20 hide">
            <div className="flex w-full items-start text-right">
              <CloseIcon
                fontSize="large"
                className="pb-2 text-right cursor-pointer"
                onClick={() => handleClose(false)}
              />
            </div>
            {children}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
