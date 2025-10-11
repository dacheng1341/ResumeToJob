import { Form } from "components/ResumeForm/Form";
import {
  BulletListTextarea,
  InputGroupWrapper,
} from "components/ResumeForm/Form/InputGroup";
import { FeaturedSkillInput } from "components/ResumeForm/Form/FeaturedSkillInput";
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { selectSkills, changeSkills } from "lib/redux/resumeManagerSlice";
import {
  selectThemeColor,
  updateFormHeadingIfNotCustomized,
} from "lib/redux/settingsSlice";
import { useTranslations } from "next-intl";

export const SkillsForm = () => {
  const skills = useAppSelector(selectSkills);
  const dispatch = useAppDispatch();
  const t = useTranslations("resumeForm.skills");
  const { featuredSkills, descriptions } = skills;
  const form = "skills";
  const themeColor = useAppSelector(selectThemeColor) || "#38bdf8";

  const handleSkillsChange = (field: "descriptions", value: string[]) => {
    dispatch(changeSkills({ field, value }));
  };
  const handleFeaturedSkillsChange = (
    idx: number,
    skill: string,
    rating: number,
  ) => {
    dispatch(changeSkills({ field: "featuredSkills", idx, skill, rating }));
  };

  // 更新表单标题（仅在用户未自定义时）
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
      {" "}
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="col-span-full">
          <BulletListTextarea
            label={t("descriptions")}
            labelClassName="col-span-full"
            name="descriptions"
            placeholder={t("placeholder")}
            value={descriptions}
            onChange={handleSkillsChange}
          />
        </div>
        <div className="col-span-full mb-4 mt-6 border-t-2 border-dotted border-gray-200" />
        <InputGroupWrapper
          label={t("featuredSkills")}
          className="col-span-full"
        >
          <p className="mt-2 text-sm font-normal text-gray-600">
            {t("featuredSkillsDescription")}
          </p>
        </InputGroupWrapper>

        {featuredSkills.map(({ skill, rating }, idx) => (
          <FeaturedSkillInput
            key={idx}
            className="col-span-3"
            skill={skill}
            rating={rating}
            setSkillRating={(newSkill, newRating) => {
              handleFeaturedSkillsChange(idx, newSkill, newRating);
            }}
            placeholder={`${t("skill")} ${idx + 1}`}
            circleColor={themeColor}
          />
        ))}
      </div>
    </Form>
  );
};
