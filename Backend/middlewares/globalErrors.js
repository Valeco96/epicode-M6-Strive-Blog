function globalErrors(error, request, response, next) {
  switch (error.status) {
    case 400:
      return response.status(400).json({ message: error.message });
    case 401:
      return response
        .status(401)
        .json({ message: "Non autorizzato a procedere" });
    case 403:
      return response.status(403).json({ message: "Proibito andare oltre" });
    case 404:
      return response.status(404).json({ message: "Non trovato" });
    case 409:
      return response.status(409).json({ message: "Conflitto" });
    case 422:
      return response.status(422).json({ message: "Non processabile" });
    default:
      return response
        .status(error.status || 500)
        .json({ message: "Errore del server" || error.message });
  }
}

export default globalErrors;
