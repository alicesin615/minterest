export function middleTruncation(string:string) {
    if (string?.length > 35) {
        return string?.substring(0, 6) + '...' + string?.substring(string?.length-4, string?.length);
      }
      return string;
}