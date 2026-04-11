export class TelemetryService {
  static async sendPayload(sessionPayload) {
    console.log('Transmitting final session payload to server...', sessionPayload);
    
    // Flatten payload to perfectly match the TA's Host Merge API requirement (Slide 15)
    const flatPayload = {
      student_id: sessionPayload.student_id || "student_204",
      session_id: sessionPayload.session_id,
      chapter_id: sessionPayload.chapter_id,
      timestamp: sessionPayload.session_end_time || new Date().toISOString(),
      session_status: sessionPayload.session_status,
      correct_answers: sessionPayload.metrics?.correct_answers || 0,
      wrong_answers: sessionPayload.metrics?.wrong_answers || 0,
      questions_attempted: sessionPayload.metrics?.questions_attempted || 0,
      total_questions: sessionPayload.metrics?.total_questions || 0,
      hints_used: sessionPayload.metrics?.hints_used || 0,
      total_hints_embedded: sessionPayload.metrics?.total_hints_embedded || 0,
      retry_count: sessionPayload.metrics?.retry_count || 0,
      time_spent_seconds: sessionPayload.metrics?.time_spent_active_seconds || 0,
      topic_completion_ratio: sessionPayload.metrics?.topic_completion_ratio || 0.0
    };

    // 1. Actually POST to the host grading server automatically
    try {
      const response = await fetch("http://100.90.57.38:8200/merge/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flatPayload)
      });
      
      if (!response.ok) {
        throw new Error(`Host server rejected payload with status: ${response.status}`);
      }
      console.log('Payload successfully validated and merged by host system!');

      // Keep the download running just so you have visual proof
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(flatPayload, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `session_payload_${sessionPayload.session_id}.json`);
      document.body.appendChild(downloadAnchorNode); 
      downloadAnchorNode.click();
      downloadAnchorNode.remove();

      localStorage.removeItem('failed_payloads');
    } catch(error) {
      console.error('Network failure during submission. Caching to payload queue...', error);
      const queue = JSON.parse(localStorage.getItem('failed_payloads') || '[]');
      const existingIdx = queue.findIndex(p => p.session_id === sessionPayload.session_id);
      if (existingIdx !== -1) {
        queue[existingIdx] = sessionPayload;
      } else {
        queue.push(sessionPayload);
      }
      localStorage.setItem('failed_payloads', JSON.stringify(queue));
    }
  }
}
