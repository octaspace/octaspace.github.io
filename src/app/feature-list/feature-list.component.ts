import { Component } from '@angular/core';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css']
})
export class FeatureListComponent {
  icons = [
    { name: 'Tensorflow', image: 'assets/img/logos/tensorflow.svg', copied: false },
    { name: 'Wunjo', image: 'assets/img/logos/wunjo.png', copied: false },
    { name: 'DeepSeek', image: 'assets/img/logos/deepseek.png', copied: false },
    { name: 'PyTorch', image: 'assets/img/logos/pytorch.svg', copied: false },
    { name: 'Ubuntu', image: 'assets/img/logos/ubuntu.svg', copied: false },
    { name: 'ComfyUI', image: 'assets/img/logos/comfyui.png', copied: false },
    { name: 'Hunyuan3D', image: 'assets/img/logos/Hunyuan3D.png', copied: false },
    { name: 'Voice Crafter', image: 'assets/img/logos/voice.png', copied: false },
    { name: 'Anything LLM', image: 'assets/img/logos/anything.png', copied: false },
    { name: 'Whisper ASR', image: 'assets/img/logos/openai.png', copied: false },
    { name: 'Windows 11', image: 'assets/img/logos/windows.png', copied: false },
    { name: 'Nvidia CUDA', image: 'assets/img/logos/nvidia2.png', copied: false },
  ];

  copyToClipboard(iconName: string) {
    navigator.clipboard.writeText(iconName).then(() => {
      this.icons.forEach(icon => (icon.copied = false));
      const copiedIcon = this.icons.find(icon => icon.name === iconName);
      if (copiedIcon) copiedIcon.copied = true;
      setTimeout(() => {
        if (copiedIcon) copiedIcon.copied = false;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  getIconOpacity(index: number): number {
    const maxIcons = this.icons.length;
    return 1 - (index / maxIcons) * 0.8; // Adjust the factor (1.27) for a more pronounced fade
  }
}
