import { useState } from "react";
import { useIa } from "../services/useIa";

export const IaMessage = ({ product_id }) => {
  const [responseApi, setresponseApi] = useState(undefined);
  const [message, setmessage] = useState("");
  const [response, setresponse] = useState(false);
  const { getIaResponse } = useIa();

  const onSubmit = (e) => {
    e.preventDefault();

    if (message.trim().length > 0) {
      setresponse(true);
      setresponseApi(undefined);
      getIaResponse(setresponseApi, product_id, message);
    }
  };

  const parseBold = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  };

  return (
    <>
      <form className="w-100" onSubmit={onSubmit}>
        <div className="d-flex gap-2 align-items-end w-100">
          <div className="flex-grow-1">
            <label htmlFor="ia" className="form-label">
              Pídele recomendaciones a la IA{" "}
              <i className="fa-solid fa-brain fs-6"></i>
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setmessage(e.target.value)}
              className="form-control"
              id="ia"
              placeholder="Pídele recomendaciones a la IA"
            />
          </div>
          <button type="submit" className="rounded btn-ia">
            Enviar
          </button>
        </div>
      </form>

      {response && (
        <div className="bg-light rounded mt-2 p-2 shadow-sm ia-msg text-dark">
          <div
            dangerouslySetInnerHTML={{
              __html:
                responseApi && responseApi.success
                  ? parseBold(responseApi.data)
                  : "La IA está pensando...",
            }}
          />
        </div>
      )}
      {responseApi && responseApi.success && response  && <button className="button bg-danger rounded p-1 min-size text-light mt-1" onClick={()=> setresponse(false)}>Quitar</button>}
    </>
  );
};
