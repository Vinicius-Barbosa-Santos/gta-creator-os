"use client";

import { useState } from "react";

export default function PasswordField({ accountMode }: { accountMode: boolean }) {
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const name = accountMode ? "password" : "key";
  const id = accountMode ? "studio-account-password" : "studio-owner-key";

  return (
    <div className="grid gap-2">
      <label className="login-label" htmlFor={id}>{accountMode ? "Senha" : "Chave de acesso"}</label>
      <div className="login-password">
        <input
          id={id}
          type={visible ? "text" : "password"}
          name={name}
          autoComplete={accountMode ? "off" : "section-studio-owner current-password"}
          readOnly={accountMode && !editing}
          onFocus={(event) => {
            if (accountMode && !editing) {
              event.currentTarget.value = "";
              setEditing(true);
            }
          }}
          placeholder={accountMode ? "Digite sua senha" : "Digite sua chave"}
          autoCapitalize="none"
          spellCheck={false}
          required
          maxLength={256}
        />
        <button
          type="button"
          aria-controls={id}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? "Ocultar" : "Mostrar"}
        </button>
      </div>
    </div>
  );
}
