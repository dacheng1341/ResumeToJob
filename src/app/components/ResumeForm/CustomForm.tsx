"use client";
import { Form } from "components/ResumeForm/Form";
import { BulletListTextarea } from "components/ResumeForm/Form/InputGroup";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeCustom, selectCustom } from "lib/redux/resumeManagerSlice";
import { updateFormHeadingIfNotCustomized } from "lib/redux/settingsSlice";
import { useTranslations } from "next-intl";

export const CustomForm = () => {
  const custom = useAppSelector(selectCustom);
  const dispatch = useAppDispatch();
  const t = useTranslations("resumeForm.custom");
  const { descriptions } = custom;
  const form = "custom";

  const handleCustomChange = (field: "descriptions", value: string[]) => {
    dispatch(changeCustom({ field, value }));
  };

  useEffect(() => {
    dispatch(
      updateFormHeadingIfNotCustomized({
        field: form,
        value: t("title"),
      }),
    );
  }, [dispatch, form, t]);

  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        {" "}
        <div className="col-span-full">
          <BulletListTextarea
            label={t("customContent")}
            labelClassName="col-span-full"
            name="descriptions"
            placeholder={t("placeholder")}
            value={descriptions}
            onChange={handleCustomChange}
          />
        </div>
      </div>
    </Form>
  );
};
