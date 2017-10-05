# book


```http
HTTP GET ? skip=2 & limit=2 & editions=en-itani
```

```json
[{
  "en-itani": "The Most Gracious, the Most Merciful."
}, {
  "en-itani": "It is You we worship, and upon You we call for help."
}]
```

```http
HTTP GET ? skip=2 & limit=2 & editions=en-itani & editions=fa-makarem
```

```json
[{
  "en-itani": "The Most Gracious, the Most Merciful.",
  "fa-makarem": "(خداوندی که) بخشنده و بخشایشگر است (و رحمت عام و خاصش همگان را فرا گرفته)."
}, {
  "en-itani": "It is You we worship, and upon You we call for help.",
  "fa-makarem": "(پروردگارا!) تنها تو را می‌پرستیم؛ و تنها از تو یاری می‌جوییم."
}]
```