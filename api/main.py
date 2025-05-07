from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import FileResponse, JSONResponse
from processamento import processar_pis_cofins
import shutil
import os

app = FastAPI()

@app.post("/processar-pis-cofins/")
def processar_pis_cofins_api(
    usuario_file: UploadFile = File(...),
    dominio_file: UploadFile = File(None)
):
    usuario_path = f"temp_{usuario_file.filename}"
    with open(usuario_path, "wb") as buffer:
        shutil.copyfileobj(usuario_file.file, buffer)
    dominio_path = None
    if dominio_file:
        dominio_path = f"temp_{dominio_file.filename}"
        with open(dominio_path, "wb") as buffer:
            shutil.copyfileobj(dominio_file.file, buffer)
    try:
        relatorio_path = processar_pis_cofins(usuario_path, dominio_path)
        return FileResponse(relatorio_path, filename=os.path.basename(relatorio_path), media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})
    finally:
        os.remove(usuario_path)
        if dominio_path:
            os.remove(dominio_path) 