import { useState } from "react";
import { Stack, TextField } from "@fluentui/react";
import { SendRegular } from "@fluentui/react-icons";
import Send from "../../assets/Send.svg";
import styles from "./QuestionInput.module.css";

interface Props {
  onSend: (question: string, id?: string) => void;
  disabled: boolean;
  placeholder?: string;
  clearOnSend?: boolean;
  conversationId?: string;
  chatInactive: boolean;
}

export const QuestionInput = ({
  onSend,
  disabled,
  placeholder,
  clearOnSend,
  conversationId,
  chatInactive,
}: Props) => {
  const [question, setQuestion] = useState<string>("");

  const suggestedQuestions = [
    "What are the industry standards used at Pearson?",
    "What are the Pearson’s security requirements for deploying applications?",
    "What are the policies around handling user PII data?",
    "What are my most vulnerable assets?",
  ];

  const sendQuestion = () => {
    if (disabled || !question.trim()) {
      return;
    }

    if (conversationId) {
      onSend(question, conversationId);
    } else {
      onSend(question);
    }

    if (clearOnSend) {
      setQuestion("");
    }
  };

  const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
    if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
      sendQuestion();
    }
  };

  const onQuestionChange = (
    _ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setQuestion(newValue || "");
  };

  const sendQuestionDisabled = disabled || !question.trim();

  return (
    <Stack>
      {(question.length === 0 && chatInactive) && (
        <div className={styles.suggestedQuestionContainer}>
          {suggestedQuestions.map((q, i) => (
            <div
              key={`${q}__${i}`}
              className={styles.suggestedQuestion}
              onClick={() => {
                setQuestion(q + " ");
              }}
            >
              {q}
            </div>
          ))}
        </div>
      )}
      <Stack horizontal className={styles.questionInputContainer}>
        <TextField
          className={styles.questionInputTextArea}
          placeholder={placeholder}
          multiline
          resizable={false}
          borderless
          value={question}
          onChange={onQuestionChange}
          onKeyDown={onEnterPress}
        />
        <div
          className={styles.questionInputSendButtonContainer}
          role="button"
          tabIndex={0}
          aria-label="Ask question button"
          onClick={sendQuestion}
          onKeyDown={(e) =>
            e.key === "Enter" || e.key === " " ? sendQuestion() : null
          }
        >
          {sendQuestionDisabled ? (
            <SendRegular className={styles.questionInputSendButtonDisabled} />
          ) : (
            <img src={Send} className={styles.questionInputSendButton} />
          )}
        </div>
        <div className={styles.questionInputBottomBorder} />
      </Stack>
    </Stack>
  );
};
