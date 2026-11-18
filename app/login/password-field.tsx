"use client";

import { useState } from "react";

export default function PasswordField({ accountMode }: { accountMode: boolean }) {
  const [visible, setVisible] = useState(false);
  const name = accountMode ? "password" : "key";

  return (
    <div className="grid gap-2">
      <label className="login-label" htmlFor="studio-password">{accountMode ? "Senha" : "Chave de acesso"}</label>
      <div className="login-password">
        <input
          id="studio-password"
          type={visible ? "text" : "password"}
          name={name}
          autoComplete="current-password"
          placeholder={accountMode ? "Digite sua senha" : "Digite sua chave"}
          autoCapitalize="none"
          spellCheck={false}
          required
          maxLength={256}
        />
        <button
          type="button"
          aria-controls="studio-password"
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? "Ocultar" : "Mostrar"}
        </button>
      </div>
    </div>
  );
}
