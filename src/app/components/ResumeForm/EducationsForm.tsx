"use client";
import { Form, FormSection } from "components/ResumeForm/Form";
import {
  BulletListTextarea,
  Input,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import {
  changeEducations,
  selectEducations,
} from "lib/redux/resumeManagerSlice";
import type { ResumeEducation } from "lib/redux/types";
import { updateFormHeadingIfNotCustomized } from "lib/redux/settingsSlice";
import { useTranslations } from "next-intl";

export const EducationsForm = () => {
  const educations = useAppSelector(selectEducations);
  const dispatch = useAppDispatch();
  const t = useTranslations("resumeForm.education");
  const showDelete = educations.length > 1;
  const form = "educations";

  useEffect(() => {
    dispatch(
      updateFormHeadingIfNotCustomized({
        field: form,
        value: t("title"),
      }),
    );
  }, [dispatch, form, t]);

  return (
    <Form form={form} addButtonText={t("add")}>
      {educations.map(
        ({ id, school, degree, gpa, date, descriptions }, idx) => {
          const handleEducationChange = (
            ...[
              field,
              value,
            ]: CreateHandleChangeArgsWithDescriptions<ResumeEducation>
          ) => {
            dispatch(changeEducations({ idx, field, value } as any));
          };

          const showMoveUp = idx !== 0;
          const showMoveDown = idx !== educations.length - 1;

          return (
            <FormSection
              key={id || `education-${idx}`}
              form="educations"
              idx={idx}
              showMoveUp={showMoveUp}
              showMoveDown={showMoveDown}
              showDelete={showDelete}
              deleteButtonTooltipText={t("delete")}
            >
              <Input
                label={t("school")}
                labelClassName="col-span-4"
                name="school"
                placeholder=""
                value={school}
                onChange={handleEducationChange}
              />
              <Input
                label={t("date")}
                labelClassName="col-span-2"
                name="date"
                placeholder=""
                value={date}
                onChange={handleEducationChange}
              />
              <Input
                label={t("degree")}
                labelClassName="col-span-4"
                name="degree"
                placeholder=""
                value={degree}
                onChange={handleEducationChange}
              />
              <Input
                label={t("gpa")}
                labelClassName="col-span-2"
                name="gpa"
                placeholder=""
                value={gpa}
                onChange={handleEducationChange}
              />{" "}
              <div className="col-span-full">
                <BulletListTextarea
                  label={t("additionalInfo")}
                  labelClassName="col-span-full"
                  name="descriptions"
                  placeholder={t("placeholder")}
                  value={descriptions}
                  onChange={handleEducationChange}
                />
              </div>
            </FormSection>
          );
        },
      )}
    </Form>
  );
};
