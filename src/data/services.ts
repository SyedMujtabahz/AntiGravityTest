export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  description: string;
  category: 'pc' | 'peripherals' | 'infrastructure';
  icon: string;
  tags: string[];
  badge: string;
  imageUrl: string;
  imageAlt: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'os-installation',
    code: 'SRV.01 // SYSTEM',
    title: 'OS Installation & Optimization',
    description:
      'Clean deploy for Windows 11 Enterprise, Ubuntu Linux, macOS Sonoma, and Windows Server 2025. Includes firmware UEFI updates, telemetry purging, and micro-driver tuning.',
    category: 'pc',
    icon: 'install_desktop',
    tags: ['Dual Boot', 'Driver Stack', 'Data Isolation'],
    badge: 'Turnaround: 2-4h',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCgVrMPwCvJRo3uP_iVIM9m9WyEnq8nrAJaJVe74DL-4hgSxhvqeapHushyPAwnr8oX3EvyrBN8BUrPEKnJBSX3090JRop-wCizbxJe93rEO1clCFHtsvBOLMDIEmnnZPysHecCyluoKIB8A_rAOMF_2855DdVqjYiwpd-egQu1_99m5zaF5zSHyj6RNUDLiOYkfl_ELsRo8_wXncxOHCNZVY9QyqjYkFU91NpFe7cu',
    imageAlt: 'Windows, macOS, and Linux operating systems',
  },
  {
    id: 'troubleshooting',
    code: 'SRV.02 // DIAG',
    title: 'Software/Hardware Troubleshooting',
    description:
      'Resolving recurrent Blue Screens of Death (BSOD), kernel panic crashes, memory address corruption, driver registry conflicts, and embedded rootkits.',
    category: 'pc',
    icon: 'bug_report',
    tags: ['DMP Analysis', 'MemTest86+', 'Malware Purge'],
    badge: 'Realtime Triage',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBdoxBjt6u4yHc5mE6s7IX44Hrml9WwdS4s_kFW8_TsrolPXcXEenzuNDwUnUd0xqFNcD-GyE6i_ea0r80rZINdMscrmL6QnNEwEkR0Ln1UrNaeKHuy3eQja_c1ycnCDmpwXAqQ5CGvsafd7kabBbmbL6kJ5tFHlsJ2ZbKH98Xal8QCImgOzg_WeIsXvdvH4VRJaO9wJKCWwrmSp_IqrTb9YKtTJCSjrhmWjRpx1nBD',
    imageAlt: 'IT technician analyzing diagnostics & oscilloscope',
  },
  {
    id: 'laptop-repair',
    code: 'SRV.03 // CHIP-LEVEL',
    title: 'Laptop Repairing & BGA Micro-Soldering',
    description:
      'Precision SMD board repair, ultrasonic liquid damage recovery, short-circuit rail isolation, Type-C power delivery IC replacements, and hinge bracket rebuilds.',
    category: 'pc',
    icon: 'laptop_chromebook',
    tags: ['Thermal Cam', 'BGA Reball', 'MacBook / ThinkPad'],
    badge: 'Lab Certified',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCADUOGJbd6ERopw4ZzX0QKoKj_2CxZXjZI17GqDQJNJFAJhp_gTyX82obTLql-lSUCTyfrrCXi0bRlytjyQ6mEcPXwFsaDcAzd0_m4nYOeOU_1uUR5vwwXIkL-IrgbYixhCMrtnG34U2z_2rPEC6SdouoCwp1iiA7ZH3dycl5IoLgYtw9S7_15C79WXAViAn0yWGYp6RY7l_t-h4t-tHNP0hzJ6yj4OMAgtQQqZX51',
    imageAlt: 'BGA micro-soldering station under microscope',
  },
  {
    id: 'desktop-repair',
    code: 'SRV.04 // WORKSTATION',
    title: 'Desktop PC Repairing',
    description:
      'Diagnostics of high-wattage power supplies (PSU), GPU VRAM reflow, blown capacitor recapping, thermal paste delidding, and PCIe lane saturation testing.',
    category: 'pc',
    icon: 'desktop_windows',
    tags: ['VRM Testing', 'GPU Diagnostics', 'Recapping'],
    badge: 'Same-Day Available',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBrveD7dAraU9c4XBnjV8V7n7pvNT4cUXyEgsoQYEmCntKi1_Ua01uzTEbK7f1kTxvQ-fwOolLmZ_HKztlW7vHbstHsv_VefOQYbc8cr3h8JoNGsjoDdfvQ3mTi42zV1gSlCqIIyvoMf4g8eSD1iYLdMTgK5vXMc3ZClbDPH049x_mS0iLPIMV6p6cQxk8r89wOiQTPC3EhaWR2kp9dTHvaOsnt7gKnreUz13YYsDEh',
    imageAlt: 'Desktop PC hardware repair and GPU testing',
  },
  {
    id: 'gaming-pc-builds',
    code: 'SRV.05 // ESPORTS RIG',
    title: 'Custom Gaming PC BUILDS',
    description:
      'Handcrafted hardline water loops, CNC custom cable routing, sub-millivolt curve overclocking, whisper-quiet acoustic baffles, and maximum 4K 240Hz frame stability.',
    category: 'pc',
    icon: 'sports_esports',
    tags: ['Custom Loop', 'Undervolting', 'FurMark 24h'],
    badge: 'Zero Bottleneck',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAMYfPWSEuhvaEMg9CcK8jkMJP1eLL9Bg6oCPttAT3lIbsWhMLyfOw0N2YMe9KNaNT0Hlz4eVcu_oZmJVItGY-ijPqe9Ad4it3G-NPhfX-GRzri6Udt40AeZeaMX5h1A12S0FBFJFLfHQvmg0eaajz5PX_cfujSKYXsAttHahF5Y1Z84qVZboDM3H5VnGe7oPWJuGkVmRZCkqWRMWYzNyxbpFJFXQSnMsYoQ1YsOCFD',
    imageAlt: 'Custom liquid cooled gaming PC with RGB',
  },
  {
    id: 'printer-repair',
    code: 'SRV.06 // OPTOMECHANICS',
    title: 'Printer Repairing',
    description:
      'Industrial LaserJet, InkJet & barcode thermal printers. Pickup roller overhauls, fuser heating element swaps, printhead degunking, and logic motherboard rebuilding.',
    category: 'peripherals',
    icon: 'print',
    tags: ['HP / Canon / Epson', 'Fuser Units', 'Thermal Heads'],
    badge: 'Commercial Grade',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgT3tU85X2ZUZr9pao1Jr9jmMpPs_e9qJAN8aX2nUw020J6pV2_qHLNf3L2S4EMz-1s2JCaMRo9gCLl5qvnjiuJ5F5yE9pEAvDagxbNs78UPIoYJ3jX4AsEBem5fC6r7mvZnoQizD_Rt-xW6tfL74hLWsZIPEf3HFHcgiWUksYql-eKsVkNCja0Z9siP-qwi1ID027TScqhRWR7kDRfuJ_YQ_Ua--i-gLU55mkhmMP',
    imageAlt: 'Industrial LaserJet and thermal printer repair',
  },
  {
    id: 'toner-refilling',
    code: 'SRV.07 // CONSUMABLES',
    title: 'Toner Refilling & Drum Servicing',
    description:
      'High-yield micro-fine magnetic toner replenishment. Organic photoconductor (OPC) drum replacement, wiper blade exchange, waste hopper vacuuming, and optical calibration.',
    category: 'peripherals',
    icon: 'format_paint',
    tags: ['OPC Drums', 'Zero Smear QA', 'High Yield'],
    badge: 'Express Turnaround',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCQ9j2IPQ0nCLy0b4QG-cl6EN-j42ARHJtRARzR_9Jon0JkosTvHgQPeA8Dy3FQyacV1xsLek-cGY07aYr0FqRysEoHKaJCmIuSqDBiaCGvFGpD5PCDMyg3ibJrWfu6-6vG0W5fTQVpBiogctPFW3Q-kQ5hfFmr4Sp3ph-hf5ZTnGcu9cOPmzsGwKZrHP_p_kvMZ2X9978kl6u6S1nVdwbPVwnmHywn9Ohfl-p38vx',
    imageAlt: 'Laser printer toner cartridge and OPC drum servicing',
  },
  {
    id: 'ups-repair',
    code: 'SRV.08 // POWER LAB',
    title: 'UPS & Inverter Repairing',
    description:
      'Enterprise APC, Eaton, and CyberPower UPS servicing. Pure sine wave inverter diagnostics, high-current MOSFET replacement, dry lead-acid to LiFePO4 battery upgrades.',
    category: 'infrastructure',
    icon: 'battery_charging_full',
    tags: ['MOSFET Solder', 'Load Bank Test', 'Surge Suppression'],
    badge: 'SLA Assured',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDtphESvQu74fjd6eHzAZ4116s-cDA0QViBXhGtMGdM4-eszk9CmznfOHRI6vTMIuTKpc1GEvak9Yhk-56LmBt88MYYgearRIeYQ1zmDxmCAYB6iGWtdv1In0ayvTV-J_seZu2X9JFd06e7WUTsCZnBFfTvziUo5EHTPRLPQjc2cnnlG6IrJbO7QuyXJtYGSiczycRiFO3B3rYF0OVJB6do3-FCyqj7D69kvdnrjN_0',
    imageAlt: 'UPS inverter repair with multimeter and LiFePO4 battery',
  },
  {
    id: 'lcd-led-repair',
    code: 'SRV.09 // OPTRONICS',
    title: 'LCD / LED & Monitor Repairing',
    description:
      'Panel backlight LED array swapping, T-Con timing controller micro-chip diagnostics, COF tab bonding, high-refresh 144Hz-360Hz gaming monitor power board rebuilding.',
    category: 'peripherals',
    icon: 'tv',
    tags: ['Backlight Array', 'T-Con Repair', 'HDR Calibration'],
    badge: 'Pixel Perfect',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAQADM4kYUTtomZhemJ7klaoyFwuVcu7e3PeCoCIdtFW45eHzrbvavRVIs4deG6olMEhC8dzuTpEFi2tlBEqcfHEuPLZvtGANbeS9uQoZyEjmr0qDAYRrvRK_B1jxX1Nb41oumlIg4ge92Qji_LZIMXxNOBTxAoLsVyjV2FQO6OuwCj-LxYn-K3y1zT86302JIh5Dmb05YC2VbqPpAdJGcU5QhFmISBscihjRWRJJW_',
    imageAlt: 'Curved gaming monitor and LED backlight repair',
  },
  {
    id: 'speaker-repair',
    code: 'SRV.10 // ACOUSTICS',
    title: 'Speaker & Audio System Repairing',
    description:
      'Studio monitor and PA speaker amplifier diagnostics, burned voice coil rewinding, passive crossover capacitor replacements, and Bluetooth/DAC analog stage rebuilds.',
    category: 'peripherals',
    icon: 'volume_up',
    tags: ['Voice Coils', 'Amp Stages', 'Audio DAC'],
    badge: 'Hi-Fi Certified',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBlkjVlkqWvihEYkuzK1oq_3ud7SFXl1UYrTAztbeWd6c6P18mjxYb4XLUaolPo7Sdrci65iHNEcofDatsnO14gczJC2V4dpqzqHX0ZMiapWo1fwaL27c6jRp3_NkKOsiFtpjXT80G78vP5X4ctEk0XejoKZd3nr2yZOBxy9I5K2ofST8FnkaBtzakkxkDW3j9r0yNnMFMJZjGU9SXN2NWqbuufp8Ckh0Pkcri7Kh4-',
    imageAlt: 'Audio speaker voice coil rewinding and amplifier workbench',
  },
  {
    id: 'enterprise-networking',
    code: 'SRV.11 // TOPOLOGY',
    title: 'Enterprise Networking',
    description:
      'Structured Cat6A/Cat7 & optical fiber patching. Layer 3 managed VLAN segmentation, multi-node Wi-Fi 6E/7 mesh deployments, pfSense firewall gateways, and VPN tunnels.',
    category: 'infrastructure',
    icon: 'hub',
    tags: ['Cat6A / Fiber', 'Cisco / UniFi', 'Firewall Hardening'],
    badge: 'Zero Packet Loss',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAES3yRFasAX-Y1AEfhcPSfTFsxDcbh8igMXqX56EZqYcEqszRX1FdpT0nlTfb8-IDf0Ox-8vh6mKhxXW-rzi1snzXaqrIKdz5PQ27smaCU2tQYVBtFmPYMpNmFX5R9O_2329Y31P-ezSuD8P2IQpF4BVkCh39kAAkx4OUEkqbrb9nuL01KiwkYGu4cS9l7jTH0Flyg25IjYZzLWKaXmB3JpI8xupXvXvMt9esvS23j',
    imageAlt: 'Enterprise patch panel and structured Cat6A network rack',
  },
  {
    id: 'server-installation',
    code: 'SRV.12 // DATA CENTER',
    title: 'Server Installation & Configuration',
    description:
      '1U-4U rackmount server deployments, SAN/NAS high-availability storage arrays, Proxmox VE / VMware ESXi clusters, Active Directory, and encrypted offsite failovers.',
    category: 'infrastructure',
    icon: 'dns',
    tags: ['VMware / Proxmox', 'RAID Array SLA', 'Active Directory'],
    badge: 'Tier 4 Ready',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAxPVo9yuuyopuZVXAPsdNG79jKPfxV20kaq983gVze3cM8bZto8vvHv2D3mVnCHHTzfRjfQfcduOsXl-PCM2c4R0h40nwLt3hd6plcna1hA9l-PJnI96Pj9qq_FktXgABdRx2xPb3nw6nhPhVfvWceijd25vav-DXaaS7jKE4cld-Bu4GPJPPJRKURPG0Lkru2zZn2roHytv-ECypjbrOlJmYVP03LoEuEB5sgJowF',
    imageAlt: 'Data center server rack installation with engineer',
  },
];

export const LAB_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAIp6663XUXDapzoeG0xB9Ts4uOtkQdauOzAowuVf83CHCwoiywQyZDndQ9LBrUsaWLMd23c6EeDGgtJMKAdEQczeotZV28_yiN5ggF3e4nj-xmB-lVm2RQVtErSb2hdGYOqHsh1GHa-c7Cs3RqPlenx0uYQumP_5sJ9ljwrfVvNjmziGAVTGysMABzyVfYggky3AO9wk-QcGjZQF7kAaUl3UhDH7HaQ0Dx6tOm3mCN';
