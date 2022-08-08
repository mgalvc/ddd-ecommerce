export default interface BaseStorage {
  addFile(buffer: Buffer, fileName: string): Promise<string>
}