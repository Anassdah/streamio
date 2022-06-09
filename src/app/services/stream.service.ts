import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  isStreaming = true;

  private streamingHost = "http://localhost:4000/stream";

  constructor(private http: HttpClient, private auth: AuthService) { }

  async startStream(title: string) {
    let streamEndpoints = await this.http.post<any>(this.streamingHost, {title: title}).toPromise();
    return streamEndpoints;
  }
  
  stopStream() {
    return this.http.delete(this.streamingHost);
  }

  async getStreams() {
    let streams = await this.http.get(this.streamingHost).toPromise();
    return streams;
  }

  async getStreamByID(streamId: string) {
    let streams = await this.http.get<any>(this.streamingHost + "/streams/" + streamId).toPromise();
    return streams;
  }

}
