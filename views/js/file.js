// file select on change of input
var formData = new FormData()

document.getElementById("mFile").addEventListener("change", async (e) => {
    e.preventDefault()
    console.log('file', e.target.files[0])
    formData.append("mFile", e.target.files[0])
})

//upload logic
document.getElementById("fileform").addEventListener("submit", async(e) =>{
    e.preventDefault()
    console.log(`formData =`, formData)
    await fetch(`/api/file/upload`, {
        method: "POST",
        body: formData
    }).then(res => res.json())
    .then(res => {
        alert(res.msg)
        window.location.href="/"
    }).catch(err => console.log(err.msg))
})


