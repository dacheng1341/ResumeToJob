import { useEffect, useCallback } from "react";
import { Form, FormSection } from "components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import {
  changeWorkExperiences,
  selectWorkExperiences,
} from "lib/redux/resumeManagerSlice";
import type { ResumeWorkExperience } from "lib/redux/types";
import { useTranslations } from "next-intl";
import { updateFormHeadingIfNotCustomized } from "lib/redux/settingsSlice";

export const WorkExperiencesForm = () => {
  const workExperiences = useAppSelector(selectWorkExperiences);
  const dispatch = useAppDispatch();
  const t = useTranslations("resumeForm.workExperience");

  const showDelete = workExperiences.length > 1;

  useEffect(() => {
    dispatch(
      updateFormHeadingIfNotCustomized({
        field: "workExperiences",
        value: t("title"),
      }),
    );
  }, [dispatch, t]);

  return (
    <Form form="workExperiences" addButtonText={t("add")}>
      {workExperiences.map(
        ({ id, company, jobTitle, date, descriptions }, idx) => {
          const handleWorkExperienceChange = (
            ...[
              field,
              value,
            ]: CreateHandleChangeArgsWithDescriptions<ResumeWorkExperience>
          ) => {
            dispatch(changeWorkExperiences({ idx, field, value } as any));
          };
          const showMoveUp = idx !== 0;
          const showMoveDown = idx !== workExperiences.length - 1;

          return (
            <FormSection
              key={id || `work-${idx}`}
              form="workExperiences"
              idx={idx}
              showMoveUp={showMoveUp}
              showMoveDown={showMoveDown}
              showDelete={showDelete}
              deleteButtonTooltipText={t("delete")}
            >
              {" "}
              <Input
                label={t("company")}
                labelClassName="col-span-full"
                name="company"
                placeholder=""
                value={company}
                onChange={handleWorkExperienceChange}
              />{" "}
              <Input
                label={t("position")}
                labelClassName="col-span-4"
                name="jobTitle"
                placeholder=""
                value={jobTitle}
                onChange={handleWorkExperienceChange}
              />{" "}
              <Input
                label={t("date")}
                labelClassName="col-span-2"
                name="date"
                placeholder=""
                value={date}
                onChange={handleWorkExperienceChange}
              />{" "}
              <BulletListTextarea
                label={t("responsibilities")}
                labelClassName="col-span-full"
                name="descriptions"
                placeholder={t("placeholder")}
                value={descriptions}
                onChange={handleWorkExperienceChange}
              />
            </FormSection>
          );
        },
      )}
    </Form>
  );
};
