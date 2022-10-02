import React, { useCallback } from "react";
import { Card } from "antd"
import { CheckboxField, Field, Input, Text, Button, Navigation } from "../../components";
import { useApi, useForm } from "hooks";
import { signIn } from "apis";
import { initialFormState } from "./sign-in-form.state";
import { useNavigate } from "react-router-dom";
import { Path } from "paths";
import lang from "translations";

const SignIn = () => {
  const navigate = useNavigate();
  const { request: signInRequest, loading } = useApi({
    api: signIn
  });

  const {
    fields,
    modifyField,
    submitForm,
    getFormValues
  } = useForm({
    initialState: initialFormState,
  });

  const handleSignIn = useCallback(async () => {
    const { email, password } = getFormValues();
    try {
      const res = await signInRequest({ username: email, password });  
      if (res) {
        localStorage.setItem("accessToken", res.access);
        navigate(Path.MENU);
      }
    } catch (e) {
      console.log(e);
    }
    
  }, [signInRequest, getFormValues]);

  const signInCb = useCallback(async () => {
    submitForm(handleSignIn);
  }, [submitForm, handleSignIn]);

  return (
    <React.Fragment>
      <Navigation />
      <div className="mt-xxl h-full">
        <Card bordered={false} className="drop-shadow-md p-md bg-white m-auto rounded-md border-b-2 border-indigo-600 w-3/4 sm:w-1/2  xl:w-1/4">
          <Text title size="text-lg">{lang.signInToAccount}</Text>
          <div className="mt-xl">
            <Field label={lang.email} {...fields.email}>
              <Input {...fields.email} onChange={modifyField}/>
            </Field>
            <Field label={lang.password} className="mt-lg" {...fields.password}>
              <Input {...fields.password} onChange={modifyField}/>
            </Field>
            <Text color="text-red" fontWeight="font-semibold" className="text-right">{lang.forgotPassword}</Text>
            <CheckboxField {...fields.rememberMe} onChange={modifyField}>{lang.rememberMe}</CheckboxField>
            <div className="mt-lg text-right">
              <Button onClick={signInCb} loading={loading}>
                {loading ? <Text size="text-sm" color="text-white" fontWeight="font-semibold">{lang.loading}</Text> : 
                <Text size="text-sm" color="text-white" fontWeight="font-semibold">{lang.signIn}</Text>
                }
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
