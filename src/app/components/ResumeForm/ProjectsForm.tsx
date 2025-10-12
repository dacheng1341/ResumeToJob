"use client";
import { Form, FormSection } from "components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { selectProjects, changeProjects } from "lib/redux/resumeManagerSlice";
import type { ResumeProject } from "lib/redux/types";
import { useTranslations } from "next-intl";
import { updateFormHeadingIfNotCustomized } from "lib/redux/settingsSlice";

export const ProjectsForm = () => {
  const projects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();
  const t = useTranslations("resumeForm.project");
  const showDelete = projects.length > 1;

  useEffect(() => {
    dispatch(
      updateFormHeadingIfNotCustomized({
        field: "projects",
        value: t("title"),
      }),
    );
  }, [dispatch, t]);

  return (
    <Form form="projects" addButtonText={t("add")}>
      {projects.map(({ id, project, date, descriptions }, idx) => {
        const handleProjectChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeProject>
        ) => {
          dispatch(changeProjects({ idx, field, value } as any));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== projects.length - 1;

        return (
          <FormSection
            key={id || `project-${idx}`}
            form="projects"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText={t("delete")}
          >
            <Input
              name="project"
              label={t("project")}
              placeholder=""
              value={project}
              onChange={handleProjectChange}
              labelClassName="col-span-4"
            />{" "}
            <Input
              name="date"
              label={t("date")}
              placeholder=""
              value={date}
              onChange={handleProjectChange}
              labelClassName="col-span-2"
            />{" "}
            <BulletListTextarea
              name="descriptions"
              label={t("descriptions")}
              placeholder={t("placeholder")}
              value={descriptions}
              onChange={handleProjectChange}
              labelClassName="col-span-full"
            />
          </FormSection>
        );
      })}
    </Form>
  );
};
