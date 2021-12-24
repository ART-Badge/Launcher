declare function URI(uri: string): void

declare interface uri{
  scheme: string;
  authority: string;
  path: string;
  query: { id: string, name: string } | string// or query: "id=123&name=abc"
}

declare namespace URI{
  function encode(uri: uri): void
}
