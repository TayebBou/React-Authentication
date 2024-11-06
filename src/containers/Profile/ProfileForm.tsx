import { Dialog } from "primereact/dialog";
import { FormEvent, useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  authActions,
  changePassword,
} from "../../config/stateSlices/authSlice";
import { IRootState } from "../../shared/models/rootState.model";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: IRootState) => state.auth.token);
  const error = useSelector((state: IRootState) => state.auth.error);
  const newPasswordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onHide = () => {
    dispatch(authActions.setError(null));
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current?.value;

    // add validation

    dispatch(changePassword(token, enteredNewPassword, navigate));
  };

  return (
    <Fragment>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="new-password">New Password</label>
          <input type="password" id="new-password" ref={newPasswordInputRef} />
        </div>
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      </form>
      <Dialog
        dismissableMask={true}
        visible={error ? true : false}
        onHide={() => onHide()}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
        footer={<Fragment></Fragment>}
        baseZIndex={1000}
      >
        <Fragment>
          <h1
            style={{
              textAlign: "center",
              marginTop: "0",
              marginBottom: "calc(80px - 2rem)",
            }}
          >
            <strong>{error}</strong>
          </h1>
        </Fragment>
      </Dialog>
    </Fragment>
  );
};

export default ProfileForm;
