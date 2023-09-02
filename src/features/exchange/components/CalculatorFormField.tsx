import React from "react";
import styles from "./CalculatorFormField.module.scss";
import { Input, InputProps } from "../../../common/components/Input";
import { Message } from "../../../common/components/Message";
import classNames from "classnames";

type FieldExtensionInfo = {
  title: string;
  value: number | string;
  invalid?: boolean;
};

type CalculatorFormGroupProps = {
  inputProps: InputProps;
  label?: string;

  invalid?: boolean;
  extensionInfo?: FieldExtensionInfo[];
  customContent?: string;
  errorMessage?: string;
};

export function CalculatorFormField(props: CalculatorFormGroupProps) {
  const {
    inputProps,
    label = "",
    // children,
    extensionInfo = [],
    customContent = "",
    errorMessage = "",
    invalid = false,
  } = props;

  return (
    <div className={styles["e-calculator-form-group"]}>
      <div className={styles["e-calculator-form-group__label"]}>{label}</div>
      <div className={styles["e-calculator-form-group__field"]}>
        <Input invalid={invalid} {...inputProps} />
      </div>

      <div className={styles["e-calculator-form-group__extension"]}>
        <div className={styles["e-calculator-form-group__extension-wrapper"]}>
          {customContent ? (
            <p
              className={
                styles["e-calculator-form-group__extension__pay-info-text"]
              }
              dangerouslySetInnerHTML={{ __html: customContent }}
            />
          ) : (
            extensionInfo.map((info: FieldExtensionInfo) => (
              <div
                key={info.title}
                className={classNames(
                  styles["e-calculator-form-group__extension-item"],
                  {
                    [styles[
                      "e-calculator-form-group__extension-item--invalid"
                    ]]: info.invalid,
                  }
                )}
              >
                <span
                  className={
                    styles["e-calculator-form-group__extension-item-title"]
                  }
                >
                  {info.title}
                </span>{" "}
                <span>{info.value}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles["e-calculator-form-group__message"]}>
        {errorMessage && <Message appearance="danger">{errorMessage}</Message>}
      </div>
    </div>
  );
}
