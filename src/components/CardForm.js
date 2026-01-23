export default function CardForm({
  values,
  onChange,
  onSubmit,
  busy,
  error,
  submitText,
}) {

  /* TODO: Complete the CardForm component 
  - display form inputs for card_name and card_pic
  - display error message
  - display submit button 
  - handle form submission 
  - style as a form UI */

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(values);
  }

  return <form onSubmit={handleSubmit}>
        <label>
          Name: 
          <input type="text" name="card_name" value={values.card_name} onChange={onChange} disabled={busy} />
        </label>
        <label>
          Picture Url:
          <input type="text" name="card_pic" value={values.card_pic} onChange={onChange} disabled={busy} />
        </label>
      <button type="submit" disabled={busy}>
        {submitText || "Submit"}
      </button>

  </form>;
}
