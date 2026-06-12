**Day 13 — Linux Volumes, LVM & AWS EBS**

**1. Intro to Linux Volumes and AWS EBS**
- **Definition**: Linux volumes are block devices (disks, partitions) the kernel exposes. AWS EBS (Elastic Block Store) provides network-attached block storage for EC2 instances.
- **Use cases**: Persistent storage for filesystems, databases, logs, and expandable volumes when combined with LVM.

**2. Physical vs Logical vs Volume Groups**
- **Physical Volume (PV)**: A block device (e.g., /dev/xvdf) initialized for LVM with `pvcreate`.
- **Volume Group (VG)**: A pool of physical volumes created with `vgcreate` that supplies space for logical volumes.
- **Logical Volume (LV)**: Virtual block devices carved from a VG with `lvcreate`; formatted and mounted like normal disks.

**3. Mounting Volumes in Linux — common commands**
- **List block devices**: `lsblk`
- **Disk usage**: `df -h`
- **LVM tool**: `lvm` (interactive), or commands `pvs`, `vgs`, `lvs`, `pvdisplay`, `vgdisplay`, `lvdisplay`

Quick checks:
```bash
lsblk
df -h
pvs
vgs
lvs
```

**4. Managing AWS EBS on EC2 Instances (Console / CLI examples)**
- Assumption: create the three 10 GiB volumes using the AWS Console in the same Availability Zone as your EC2 instance.
- Attach volumes to a running instance (replace `<INSTANCE_ID>` and `<VOLUME_ID>`):
```bash
aws ec2 attach-volume --volume-id <VOLUME_ID_1> --instance-id <INSTANCE_ID> --device /dev/sdf   # maps to /dev/xvdf
aws ec2 attach-volume --volume-id <VOLUME_ID_2> --instance-id <INSTANCE_ID> --device /dev/sdg   # maps to /dev/xvdg
aws ec2 attach-volume --volume-id <VOLUME_ID_3> --instance-id <INSTANCE_ID> --device /dev/sdh   # maps to /dev/xvdh
```
- Notes: On some Linux AMIs the device name you specify (`/dev/sdf`) will appear as `/dev/xvdf` inside the instance.

**5. Intro to LVM (Logical Volume Manager)**
- Workflow summary:
  1. Initialize PVs: `pvcreate /dev/xvdf /dev/xvdg /dev/xvdh`
  2. View PVs: `pvs` or `pvdisplay`
  3. Create VG (use two or more PVs as needed): `vgcreate my_vg /dev/xvdf /dev/xvdg`
  4. View VGs: `vgs` or `vgdisplay`
  5. Create LV: `lvcreate -L 10G -n my_lv my_vg`
  6. View LVs: `lvs` or `lvdisplay`

Example interactive `lvm` session:
```text
$ lvm
lvm> pvcreate /dev/xvdf /dev/xvdg /dev/xvdh
lvm> pvs
lvm> vgcreate data_vg /dev/xvdf /dev/xvdg
lvm> vgs
lvm> lvcreate -L 10G -n data_lv data_vg
lvm> lvs
lvm> exit
```

**6. Using LVM with EBS for Dynamic Storage Manager**
- Format and mount a logical volume:
```bash
# create mount point
sudo mkdir -p /mnt/data_lv
# format the LV (ext4 example)
sudo mkfs.ext4 /dev/data_vg/data_lv
# mount it
sudo mount /dev/data_vg/data_lv /mnt/data_lv
# add to /etc/fstab (UUID or device path) for persistence
sudo blkid /dev/data_vg/data_lv
# then add an fstab entry using the UUID
```

- If you have a remaining plain block device (for example `/dev/xvdh`) and you don't want to put it into LVM:
```bash
sudo mkdir -p /mnt/disk1
sudo mkfs -t ext4 /dev/xvdh
sudo mount /dev/xvdh /mnt/disk1
```

**Extending a Logical Volume**
- Increase LV by 5 GiB and resize the filesystem:
```bash
# extend LV
sudo lvextend -L +5G /dev/data_vg/data_lv
# resize filesystem (ext4)
sudo resize2fs /dev/data_vg/data_lv
# verify
df -h /mnt/data_lv
```
- You can also grow the underlying EBS volume (via AWS console or `aws ec2 modify-volume`), then run `pvresize` on the PV and `lvextend` as needed.

**Helpful LVM & disk commands quick reference**
- `pvcreate /dev/xvdf /dev/xvdg /dev/xvdh` — initialize PVs
- `pvs` / `pvdisplay` — show PVs
- `vgcreate my_vg /dev/xvdf /dev/xvdg` — create VG
- `vgs` / `vgdisplay` — show VGs
- `lvcreate -L 10G -n my_lv my_vg` — create LV
- `lvs` / `lvdisplay` — show LVs
- `mkfs.ext4 /dev/my_vg/my_lv` — format LV
- `mount /dev/my_vg/my_lv /mnt/path` — mount LV
- `mkfs -t ext4 /dev/xvdh` — format a plain device

**Notes / Gotchas**
- Always ensure availability zone of EBS volumes matches the EC2 instance AZ.
- After attaching volumes wait a few seconds and run `lsblk` to see newly attached devices.
- Consider using `growpart` and filesystem-specific resize commands for partitioned devices.
- For production systems, back up data before resizing or altering volumes.

---
Generated for Day 13: LVM + AWS EBS practical notes and commands.

**Sample outputs**

`lsblk` (after attaching three EBS volumes):
```bash
NAME    MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
xvda    202:0    0   30G  0 disk
├─xvda1 202:1    0   30G  0 part /
xvdf    202:80   0   10G  0 disk
xvdg    202:96   0   10G  0 disk
xvdh    202:112  0   10G  0 disk
```

`df -h` (showing mounted LV):
```bash
Filesystem                  Size  Used Avail Use% Mounted on
devtmpfs                   3.9G     0  3.9G   0% /dev
tmpfs                      3.9G     0  3.9G   0% /dev/shm
/dev/mapper/data_vg-data_lv  10G  1.2G  8.3G  13% /mnt/data_lv
```

`pvcreate` output:
```text
Physical volume "/dev/xvdf" successfully created.
Physical volume "/dev/xvdg" successfully created.
Physical volume "/dev/xvdh" successfully created.
```

`pvs` output:
```text
PV         VG     Fmt  Attr PSize  PFree
/dev/xvdf         lvm2 a--  10.00g 10.00g
/dev/xvdg         lvm2 a--  10.00g 10.00g
/dev/xvdh         lvm2 a--  10.00g 10.00g
```

`vgcreate` output:
```text
Volume group "data_vg" successfully created
```

`vgs` output:
```text
VG      #PV #LV #SN Attr   VSize  VFree
data_vg   2   1   0 wz--n- 20.00g 10.00g
```

`lvcreate` output:
```text
Logical volume "data_lv" created.
```

`mkfs.ext4` output (format LV):
```text
mke2fs 1.45.6 (06-Jun-2026)
Creating filesystem with 2621440 4k blocks and 655360 inodes
Filesystem UUID: 1234abcd-12ab-34cd-56ef-1234567890ab
Superblock backups stored on blocks: 
    32768, 98304, 163840, 229376, 294912

Allocating group tables: done
Writing inode tables: done
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done
```

`mount` (mounting LV): no output on success; verify with `lsblk` or `df -h`.

`mkfs -t ext4 /dev/xvdh` (format plain device) sample:
```text
mke2fs 1.45.6 (06-Jun-2026)
Creating filesystem with 2621440 4k blocks and 655360 inodes
...
```

`lvextend` and `resize2fs` sample session:
```text
$ sudo lvextend -L +5G /dev/data_vg/data_lv
  Extending logical volume data_vg/data_lv to 15.00 GiB
  Logical volume data_vg/data_lv successfully resized.
$ sudo resize2fs /dev/data_vg/data_lv
resize2fs 1.45.6 (06-Jun-2026)
Resizing the filesystem on /dev/data_vg/data_lv to 3932160 (4k) blocks.
The filesystem on /dev/data_vg/data_lv is now 3932160 blocks long.
```
